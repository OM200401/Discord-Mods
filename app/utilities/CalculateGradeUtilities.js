export function calculateCumulativeGrade(gradeWeightList) {
    let totalGrade = 0;
    let totalWeight = 0;
    console.log('hello 1');

    // Iterate through each grade-weight object in the list
    gradeWeightList.forEach((item) => {
        const { grade, weight } = item;

        // Add the weighted grade to the total
        totalGrade += (grade * weight);

        // Add the weight to the total weight
        totalWeight += weight;
    });

    console.log('hello 2');

    // Check if totalWeight is not zero to avoid division by zero
    if (totalWeight !== 0) {
        // If the total weight is not 100, adjust the grade

            // Calculate the scaling factor to adjust the grade to 100%
            const scaleFactor = 100 / totalWeight;
            
            // Scale the total grade
            totalGrade = (totalGrade/100) * scaleFactor;
    

        // Return the cumulative grade
        console.log('your grade is ' + totalGrade);
        return totalGrade;
    } else {
        console.error('Total weight is zero.');
        return null; // Return null if totalWeight is zero
    }
}
