module.exports = {
    unique_element: (arr) => {
       let result = arr.reduce((newArr, current) => {
            const x = newArr.find(item => item._id === current._id);
            if (!x) {
              return newArr.concat([current]);
            } else {
              return newArr;
            }
        }, []);
        return result;
    }
}
