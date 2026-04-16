document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MODO VISITANTE / DEMO
       =============================== */
    let usuario = localStorage.getItem("usuario") || "{{ request.session.usuario_demo|default:'' }}"; // o como manejes sesión
    let productosDemo = [];

    if (!usuario) {
        productosDemo = demoProductos;
        alert("Estás en modo demo. Solo puedes ver los productos.");

        // Actualizar métricas de demo
        const totalProductos = productosDemo.length;
        const stockBajo = productosDemo.filter(p => p.stock < 5).length;
        const movimientosHoy = 0;
        const valorTotal = productosDemo.reduce((sum, p) => sum + p.valor, 0);

        const metricNumbers = document.querySelectorAll(".metric-card .card-number");
        if (metricNumbers.length >= 4) {
            metricNumbers[0].innerText = totalProductos;
            metricNumbers[1].innerText = stockBajo;
            metricNumbers[2].innerText = movimientosHoy;
            metricNumbers[3].innerText = "$" + valorTotal;
        }

        // Graficos de demo
        const categorias = [...new Set(productosDemo.map(p => p.categoria))];
        const cantidadPorCategoria = categorias.map(cat => productosDemo.filter(p => p.categoria === cat).length);

        const canvasCategorias = document.getElementById("graficoCategorias");
        if (canvasCategorias) {
            new Chart(canvasCategorias.getContext("2d"), {
                type: "doughnut",
                data: { labels: categorias, datasets: [{ data: cantidadPorCategoria, backgroundColor: ["#0077B6", "#00B4D8", "#90E0EF", "#48CAE4", "#ADE8F4"], borderWidth: 2 }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right", labels: { color: "#1F2937" } } } }
            });
        }

        const canvasInventario = document.getElementById("graficoInventario");
        if (canvasInventario) {
            const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
            const stockData = productosDemo.map(p => p.stock).concat(Array(dias.length - productosDemo.length).fill(0));
            new Chart(canvasInventario.getContext("2d"), {
                type: "line",
                data: { labels: dias, datasets: [{ label: "Inventario Total", data: stockData, borderWidth: 3, tension: 0.4, fill: true, backgroundColor: "rgba(0, 119, 182, 0.15)", borderColor: "#0077B6", pointRadius: 5, pointBackgroundColor: "#ffffff", pointBorderColor: "#0077B6", pointBorderWidth: 2, pointHoverRadius: 7 }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: "#1F2937", font: { size: 13 } }, grid: { color: "rgba(0,0,0,0.05)" } }, x: { ticks: { color: "#6B7280", font: { size: 12 } }, grid: { display: false } } } }
            });
        }

        const canvasMovimientos = document.getElementById("graficoMovimientoDiario");
        if (canvasMovimientos) {
            const dias = ["Lun", "Mar", "Mié", "Jue", "Vie"];
            new Chart(canvasMovimientos.getContext("2d"), {
                type: "bar",
                data: { labels: dias, datasets: [{ label: "Entradas", data: Array(dias.length).fill(0), backgroundColor: "#00B4D8", borderRadius: 6 }, { label: "Salidas", data: Array(dias.length).fill(0), backgroundColor: "#0077B6", borderRadius: 6 }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top", labels: { color: "#1F2937", font: { size: 13 } } } }, scales: { y: { beginAtZero: true, ticks: { color: "#1F2937" }, grid: { color: "rgba(0,0,0,0.05)" } }, x: { ticks: { color: "#6B7280" }, grid: { display: false } } } }
            });
        }
    }

    // ... resto de tu dashboard.js sigue igual (fetch y charts normales para usuarios reales)





    // static/js/dashboard.js
    document.addEventListener("DOMContentLoaded", () => {

        function safeFetch(url) {
            return fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .catch(err => {
                    console.error("Fetch error:", url, err);
                    return null;
                });
        }

        /* ===============================
           CREADORES DE CHART (OPTIMIZADOS)
           =============================== */

        function createLineChart(canvas, labels, values, options = {}) {
            const ctx = canvas.getContext("2d");

            return new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        label: options.label || "Inventario",
                        data: values,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        backgroundColor: options.backgroundColor || "rgba(0, 119, 182, 0.15)",
                        borderColor: options.borderColor || "#0077B6",
                        pointRadius: 5,
                        pointBackgroundColor: "#ffffff",
                        pointBorderColor: options.borderColor || "#0077B6",
                        pointBorderWidth: 2,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,   // ✔ FIX IMPORTANTE
                    resizeDelay: 150,             // ✔ estabilidad
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "#1F2937",
                                font: { size: 13 }
                            },
                            grid: { color: "rgba(0,0,0,0.05)" }
                        },
                        x: {
                            ticks: {
                                color: "#6B7280",
                                font: { size: 12 }
                            },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        function createBarChart(canvas, labels, datasets, options = {}) {
            const ctx = canvas.getContext("2d");

            return new Chart(ctx, {
                type: "bar",
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,  // ✔ FIX IMPORTANTE
                    resizeDelay: 150,
                    plugins: {
                        legend: {
                            position: options.legendPosition || "top",
                            labels: { color: "#1F2937", font: { size: 13 } }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: "#1F2937" },
                            grid: { color: "rgba(0,0,0,0.05)" }
                        },
                        x: {
                            ticks: { color: "#6B7280" },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        function createDoughnutChart(canvas, labels, dataset, options = {}) {
            const ctx = canvas.getContext("2d");

            return new Chart(ctx, {
                type: "doughnut",
                data: { labels, datasets: [dataset] },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,  // ✔ FIX IMPORTANTE
                    resizeDelay: 150,
                    plugins: {
                        legend: {
                            display: true,
                            position: options.position || "right",
                            labels: { color: "#1F2937" }
                        }
                    }
                }
            });
        }

        /* ===============================
           1) TENDENCIA INVENTARIO
           =============================== */
        safeFetch("/tendencia_inventario/").then(data => {
            const defaultLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
            const labels = data?.labels?.length ? data.labels : defaultLabels;
            const values = data?.datasets?.length ? data.datasets[0].data : [30, 45, 40, 60, 55, 70];

            const canvas = document.getElementById("graficoInventario");
            if (canvas) {
                createLineChart(canvas, labels, values, { label: "Inventario Total" });
            }
        });

        /* ===============================
           2) MOVIMIENTO DIARIO
           =============================== */
        safeFetch("/grafico_movimiento_diario/").then(data => {
            const defaultLabels = ["Lun", "Mar", "Mié", "Jue", "Vie"];
            const labels = data?.labels?.length ? data.labels : defaultLabels;

            let datasets;
            if (data?.datasets?.length) {
                datasets = data.datasets.map(ds => ({
                    ...ds,
                    borderWidth: 2,
                    barThickness: 28,
                    borderRadius: 6
                }));
            } else {
                datasets = [
                    { label: "Entradas", data: [5, 10, 6, 12, 8], backgroundColor: "#00B4D8", borderRadius: 6 },
                    { label: "Salidas", data: [3, 7, 4, 9, 5], backgroundColor: "#0077B6", borderRadius: 6 }
                ];
            }

            const canvas = document.getElementById("graficoMovimientoDiario");
            if (canvas) {
                createBarChart(canvas, labels, datasets, { legendPosition: "top" });
            }
        });

        /* ===============================
           3) DISTRIBUCIÓN CATEGORÍAS
           =============================== */
        safeFetch("/grafico_distribucion_categorias/").then(data => {
            const defaultLabels = ["Bebidas", "Snacks", "Lácteos"];
            const labels = data?.labels?.length ? data.labels : defaultLabels;

            const dataset = data?.datasets?.length
                ? { ...data.datasets[0] }
                : { data: [40, 30, 30], backgroundColor: ["#0077B6", "#00B4D8", "#90E0EF"] };

            const canvas = document.getElementById("graficoCategorias");
            if (canvas) {
                createDoughnutChart(canvas, labels, { ...dataset, borderWidth: 2, hoverOffset: 6 }, { position: "right" });
            }
        });

        /* ===============================
           FORZAR RESIZE CORRECTO
           =============================== */

        function resizeCharts() {
            if (!window.Chart) return;

            const charts = Object.values(window.Chart.instances || {});
            charts.forEach(chart => {
                try {
                    chart.resize();
                } catch (e) { }
            });
        }

        // Resize al cambiar pantalla
        window.addEventListener("resize", resizeCharts);

        // Resize cuando se mueve el sidebar (sidebar.js debe llamar a esto)
        document.addEventListener("sidebar-toggled", resizeCharts);
    });

});