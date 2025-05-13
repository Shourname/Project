import * as d3 from "d3";
import { useState } from "react";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false]);
    const [typeGysto, settypeGysto] = useState("Точечная диаграмма");
    const [formError, setFormError] = useState("");
    
    const handleSubmit = (event) => {        
        event.preventDefault();
        const oyValues = Array.from(event.target.oy).map(c => c.checked);

        if (!oyValues.includes(true)) {
            setFormError("Выберите хотя бы одно значение для оси OY");
            return;
        }
        setFormError("");
        setOx(event.target["ox"].value);
        settypeGysto(event.target["diagrams"].value);
		setOy(oyValues);	
	};
    const createArrGraph =(data, key)=>{   
        const groupObj = d3.group(data, d => d[key]);
        let entries = Array.from(groupObj);
        if (key === "Год") {
            entries.sort((a, b) => {
                const yearA = +a[0];
                const yearB = +b[0];
                return yearA - yearB;
            });
        }
        let arrGraph =[];
        for(let entry of entries) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        return arrGraph;
    };
    return (
        <>
            <h4 className="chart">Визуализация</h4>
            <form className="chart" onSubmit={handleSubmit}>
                {formError && <div className="error">{formError}</div>}
                
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"} />
                    Страна
                    <br/>		
                    <input type="radio" name="ox" value="Год" />
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div>
                    <input 
                        type="checkbox" 
                        name="oy" 
                        defaultChecked={oy[0]} 
                    />
                    Минимальная высота <br/>
                    <input 
                        type="checkbox" 
                        name="oy" 
                        defaultChecked={oy[1]} 
                    />
                    Максимальная высота
                </div>

                <p> 
                    Тип диаграммы <select name="diagrams" id="diagrams-select">
                        <option value="Точечная диаграмма" name="pointgram" defaultChecked={typeGysto === "Точечная"}>Точечная диаграмма</option>
                        <option value="Гистограмма" name="gystogram">Гистограмма</option>
                    </select>
                </p>

                <p>  
                    <button type="submit">Построить</button>
                </p>
                <ChartDraw 
                    data={createArrGraph(props.data, ox)} 
                    oy={oy}
                    type={typeGysto}
                />
            </form>
        </>
    )
 }
 
 export default Chart;