class SortingAlgorithms {
    constructor() {
        this.comparisons = 0;
        this.swaps = 0;
        this.steps = [];
    }

    async bubbleSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.comparisons++;
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    this.swaps++;
                    this.steps.push([...arr]);
                    await this.delay();
                }
            }
        }
        return arr;
    }

    async mergeSort(arr, left = 0, right = arr.length - 1) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await this.mergeSort(arr, left, mid);
            await this.mergeSort(arr, mid + 1, right);
            await this.merge(arr, left, mid, right);
        }
        return arr;
    }

    async merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            this.comparisons++;
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
            this.swaps++;
            this.steps.push([...arr]);
            await this.delay();
        }

        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }

    async quickSort(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pi = await this.partition(arr, low, high);
            await this.quickSort(arr, low, pi - 1);
            await this.quickSort(arr, pi + 1, high);
        }
        return arr;
    }

    async partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            this.comparisons++;
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                this.swaps++;
                this.steps.push([...arr]);
                await this.delay();
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        this.swaps++;
        this.steps.push([...arr]);
        await this.delay();
        return i + 1;
    }

    async heapSort(arr) {
        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(arr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            this.swaps++;
            this.steps.push([...arr]);
            await this.delay();
            await this.heapify(arr, i, 0);
        }
        return arr;
    }

    async heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            this.comparisons++;
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            this.comparisons++;
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.swaps++;
            this.steps.push([...arr]);
            await this.delay();
            await this.heapify(arr, n, largest);
        }
    }

    delay() {
        const speed = document.getElementById('speedControl').value;
        return new Promise(resolve => setTimeout(resolve, 101 - speed));
    }

    reset() {
        this.comparisons = 0;
        this.swaps = 0;
        this.steps = [];
    }
}