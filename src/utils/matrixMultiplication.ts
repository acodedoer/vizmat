const matrixMultiplication = (m1:number[][], m2:number[][]) =>{
    const matrix = []
    for(let i = 0; i<m1.length; i++){
      let row = [];
      for (let j = 0; j<m2[0].length; j++){
        let cell = 0;
        m1[i].forEach((num,index) => {
          cell+=num *m2[index][j];
        });
        row.push(cell);
      }
      matrix.push(row);
    }
    return matrix;
}

export default matrixMultiplication;