document.addEventListener('DOMContentLoaded', () => {
    window.visualizer = new Visualizer();
    window.visualizer.generateArray();

    document.getElementById('sizeControl').addEventListener('change', () => {
        window.visualizer.generateArray();
    });

    document.getElementById('speedControl').addEventListener('change', (e) => {
        console.log(`Speed set to: ${e.target.value}`);
    });
});