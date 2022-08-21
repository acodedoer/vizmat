const matrixAddition = (m1:number[][],m2:number[][]) => {
    const matrix = [];
    for(let i =0; i<m1.length; i++){
      let row = [];
      for(let j = 0; j<m1[0].length; j++){
        row.push(m1[i][j] + m2[i][j]);
      }
      matrix.push(row);
    }
    return matrix;
}

export default matrixAddition;