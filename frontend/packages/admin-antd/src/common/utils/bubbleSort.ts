// 冒泡排序
export function bubbleSort<T>(arr: T[], callF: (a: T, b: T) => boolean) {
    if (arr.length <= 1) {
        return arr;
    }
    for (var i = 0; i < arr.length; i++) {
        var flag = false;
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (callF(arr[j], arr[j + 1])) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true;
            }
        }
        if (!flag) {
            break;
        }
    }
    return arr;
}