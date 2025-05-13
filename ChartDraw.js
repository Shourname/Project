import * as d3 from "d3";
import { useRef, useMemo, useEffect, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
    const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
    const [error, setError] = useState("");
	
	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    }); 
	// задаем отступы в svg-элементе
	const margin = { top:10, bottom:60, left:40, right:10 };
		
	// вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    // Получаем выбранные индексы OY
    const activeIndices = props.oy
        .map((isActive, idx) => isActive ? idx : -1)
        .filter(idx => idx !== -1);

    // Проверка на наличие выбранных значений
    useEffect(() => {
        setError(activeIndices.length === 0 ? "Выберите значения для оси OY" : "");
    }, [activeIndices]);

    const allValues = props.data.flatMap(d => 
        activeIndices.map(idx => d.values[idx])
    ).filter(v => v !== undefined);

	let [min, max] = d3.extent(allValues);
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
            .padding(0.2);
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

	useEffect(() => {
        if (!scaleY || activeIndices.length === 0) return;
        
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        // рисуем график
        if (props.type === "Гистограмма") {
            activeIndices.forEach((dataIndex, colorIndex) => {
                const bandWidth = scaleX.bandwidth();
                const barWidth = (bandWidth / activeIndices.length) * 0.5;
            
                svg.selectAll(`.bar-${dataIndex}`)
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => {
                        const offset = ((bandWidth / activeIndices.length) * colorIndex) + 40;
                        return scaleX(d.labelX) + offset + (bandWidth / activeIndices.length - barWidth)/2;
                    })
                    .attr("y", d => scaleY(d.values[dataIndex]) + 9)
                    .attr("width", barWidth)
                    .attr("height", d => boundsHeight - scaleY(d.values[dataIndex]))
                    .style("fill", colorIndex === 0 ? "red" : "blue");
            });
        }
        else {
            activeIndices.forEach((dataIndex, colorIndex) => {
                svg.selectAll(`.dot-${dataIndex}`)
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[dataIndex]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", colorIndex === 0 ? "red" : "blue");
            });
        }

    }, [scaleX, scaleY, props.data, activeIndices]);

    return (
        <>
            {error && <div className="error">{error}</div>}
            <svg ref={chartRef}></svg>
        </>
	)
}

export default ChartDraw;