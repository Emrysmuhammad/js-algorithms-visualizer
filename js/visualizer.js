class Visualizer {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.array = [];
        this.isRunning = false;
    }

    generateArray() {
        const size = parseInt(document.getElementById('sizeControl').value);
        this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
        this.render();
    }

    render(highlightIndices = []) {
        this.canvas.innerHTML = '';
        const max = Math.max(...this.array);

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            const height = (value / max) * 300;
            
            bar.style.width = `${(this.canvas.offsetWidth / this.array.length) - 2}px`;
            bar.style.height = `${height}px`;
            bar.style.backgroundColor = highlightIndices.includes(index) ? '#ff006e' : '#00d4ff';
            bar.style.transition = 'all 0.1s ease';
            bar.style.borderRadius = '2px';
            
            this.canvas.appendChild(bar);
        });
    }

    async animate(algorithm, algorithmName) {
        if (this.isRunning) return;
        this.isRunning = true;

        const startTime = performance.now();
        const result = await algorithm(this.array);
        const endTime = performance.now();

        this.render();
        this.updateStats(algorithm.comparisons, algorithm.swaps, endTime - startTime);
        this.isRunning = false;
    }

    updateStats(comparisons, swaps, time) {
        document.getElementById('comparisons').textContent = comparisons;
        document.getElementById('swaps').textContent = swaps;
        document.getElementById('time').textContent = time.toFixed(2);
    }
}

async function startSorting(type) {
    const sorter = new SortingAlgorithms();
    const viz = window.visualizer;
    sorter.reset();

    await viz.animate(
        type === 'bubble' ? () => sorter.bubbleSort([...viz.array]) :
        type === 'merge' ? () => sorter.mergeSort([...viz.array]) :
        type === 'quick' ? () => sorter.quickSort([...viz.array]) :
        () => sorter.heapSort([...viz.array]),
        type
    );
}

async function startSearching(type) {
    const searcher = new SearchingAlgorithms();
    const viz = window.visualizer;
    searcher.reset();

    const target = Math.floor(Math.random() * 100) + 1;
    console.log(`Searching for: ${target}`);
}

function startStructure(type) {
    alert(`Exploring ${type} data structure`);
}

function generateArray() {
    window.visualizer.generateArray();
}

function resetVisualization() {
    window.visualizer.generateArray();
    document.getElementById('comparisons').textContent = '0';
    document.getElementById('swaps').textContent = '0';
    document.getElementById('time').textContent = '0';
}