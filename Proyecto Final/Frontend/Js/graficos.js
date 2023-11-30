$(document).ready(function(){
    graficoEducacion();
    graficoVino();
    graficoFidelidad();
});

function graficoEducacion(){
    var datos = [];
    urlingresos = "http://127.0.0.1:5500/ingresos";
    $.ajax({
        contentType: "application/json",
        type: "GET",
        dataType: "json",
        url: urlingresos,
    })

    .done(function(data) {
        data["results"].forEach(element => {
            datos.push([element[1], element[2]]);
        });

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Income');
            data.addColumn('string', 'Education');
            
            
            data.addRows(datos);
            var options = {
                title: 'Ingresos por Nivel Educativo',
                width: 600,
                height: 400
            };

            var chart = new google.visualization.BarChart(document.getElementById('graficoEducacion'));
            chart.draw(data, options);
        }
    });
}

function graficoVino(){
    var datosVino = [];
    urlVino = "http://127.0.0.1:5500/vino";
    $.ajax({
        contentType: "application/json",
        type: "GET",
        dataType: "json",
        url: urlVino,
    })
    .done(function(data, textStatus, jqXHR) {
        var spendingByStatus = {};
        data["results"].forEach(element => {
            const status = element[1]; // Marital_Status
            const spending = element[2]; // MntWines
            spendingByStatus[status] = (spendingByStatus[status] || 0) + spending;
        });

        for (const status in spendingByStatus) {
            datosVino.push([status, spendingByStatus[status]]);
        }

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawVinoChart);

        function drawVinoChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Marital Status');
            data.addColumn('number', 'Wine Spending');
            
            data.addRows(datosVino);

            var options = {
                title: 'Gasto en Vino por Estado Marital',
                width: 600,
                height: 400,
                is3D: true
            };

            var chart = new google.visualization.PieChart(document.getElementById('graficoVino'));
            chart.draw(data, options);
        }
    });
}
function graficoFidelidad(){
    var datosFidelidad = [];
    var urlFidelidad = "http://127.0.0.1:5500/fidelidad";
    $.ajax({
        contentType: "application/json",
        type: "GET",
        dataType: "json",
        url: urlFidelidad,
    })
    .done(function(data, textStatus, jqXHR) {
        // Procesar los datos para el gráfico
        // Suponiendo que los datos son [ID, Dt_Customer, Recency]
        data["results"].forEach(element => {
            datosFidelidad.push([new Date(element[1]), element[2]]);
        });

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawFidelidadChart);

        function drawFidelidadChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Dt_Customer');
            data.addColumn('number', 'Recency');
            
            data.addRows(datosFidelidad);

            var options = {
                title: 'Fidelidad de Clientes (Recency)',
                width: 600,
                height: 400,
                hAxis: { title: 'Fecha de Registro' },
                vAxis: { title: 'Recency' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('graficoFidelidad'));
            chart.draw(data, options);
        }
    });
}
