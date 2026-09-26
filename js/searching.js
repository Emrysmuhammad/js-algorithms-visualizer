class SearchingAlgorithms {
    constructor() {
        this.comparisons = 0;
        this.steps = [];
    }

    async linearSearch(arr, target) {
        for (let i = 0; i < arr.length; i++) {
            this.comparisons++;
            this.steps.push([...arr.map((v, idx) => idx === i ? v : v)]);
            await this.delay();
            if (arr[i] === target) {
                return i;
            }
        }
        return -1;
    }

    async binarySearch(arr, target) {
        const sorted = [...arr].sort((a, b) => a - b);
        let left = 0, right = sorted.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            this.comparisons++;
            this.steps.push([...sorted]);
            await this.delay();

            if (sorted[mid] === target) {
                return mid;
            } else if (sorted[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    delay() {
        const speed = document.getElementById('speedControl').value;
        return new Promise(resolve => setTimeout(resolve, 101 - speed));
    }

    reset() {
        this.comparisons = 0;
        this.steps = [];
    }
}