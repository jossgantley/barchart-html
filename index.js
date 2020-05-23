var w= 0.9 * window.innerWidth;
        var h= 0.6 * window.innerHeight;
        const padding= 80;
        const svg = d3.select("#app")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("background-color", "#eee")

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10 )
        .attr("x",0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Gross Domestic Product (GDP)");     

        svg.append("text")
        .attr("transform", "translate("+w/2+","+(h -50) + ")")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Date");     

      

window.onload = ()=>{
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response => response.json())
    .then(data =>{
       

        stringA = /-01-01/
        stringB = /-04-01/
        stringC = /-07-01/
        stringD = /-10-01/

        const newData = data.data.map(item=>{
            switch(true){
                case (stringA.test(item[0])):
                return [...item, item[0].replace(stringA, " Q1")]
                case (stringB.test(item[0])):
                return [...item, item[0].replace(stringB, " Q2")]
                case (stringC.test(item[0])):
                return [...item, item[0].replace(stringC, " Q3")]
                case (stringD.test(item[0])):
                return [...item, item[0].replace(stringD, " Q4")]
            }
        })
    


        
      
        const xScale = d3.scaleTime()
            .domain([new Date(newData[0][0]), new Date(newData[newData.length-1][0])])
            .range([padding, w-padding]);
            
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(newData, d=> d[1])])
            .range([h-padding, padding])
        
        const scaleGDP = d3.scaleLinear()
        .domain([0, d3.max(newData, d=> d[1])])
        .range([padding, h-padding])
        
            
 
            

        const tooltip= d3.select("body")
            
            
            .append("div")
       
            .attr("id", "tooltip")
           
            .style("opacity", "0")
                       

        svg.selectAll(".bar")
            .data(newData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d,i)=> xScale(new Date(d[0])))
            .attr("y", d => h - scaleGDP(d[1]))
            .attr("width", 4)
            .attr("height", (d,i)=> scaleGDP(d[1])-padding)
            .attr("data-date", d=>d[0])
            .attr("data-gdp", d=>d[1])
            .attr("fill", "lightblue")
            .on("mousemove", (d)=>{
                tooltip
                    .style("opacity", "0.9")
                    
                    .html(`${d[2]} <br> $${d[1]} Billion`)
                    .attr("data-date", d[0])
                    .style("top", d3.event.pageY - 80 + "px")
                    .style("left", d3.event.pageX  -50 + "px")
               })
                    
                    
            .on("mouseleave", ()=>tooltip.style("opacity", "0"))
        

            
          

            
            
           
       
        
        
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0," + (h-padding) + ")")
            .call(xAxis)

        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)
           
        
        
    
        })
    .catch(()=>{
        console.log("Error")
    })
    }
            
window.onresize = ()=>{
    h= 0.6 * window.innerHeight
    w= 0.8 * window.innerWidth
}
            
    



