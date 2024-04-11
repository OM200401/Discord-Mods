import db from '../lib/firebase';
import { doc, getDoc,setDoc} from 'firebase/firestore';

export class Assignment {
    constructor(type, dueDate, weightage) {
        this.type = type;
        this.dueDate=  dueDate;
        this.weightage=weightage;
        // Add more fields here as needed
    }
}

export async function getQuizDoc(name) {
    const quizRef = doc(db,'quizzes', name);
    const quizDoc = await getDoc(quizRef);
    return quizDoc;

}


export async function getEssayDoc(name) {
    const essayRef = doc(db,'essays', name);
    const essayDoc = await getDoc(essayRef);
    return essayDoc;

}


export async function getQuizRef(name) {
    const quizRef = doc(db,'quizzes', name);
    return quizRef;

}


export async function getEssayRef(name) {
    const essayRef = doc(db,'essays', name);
    return essayRef;

}

export async function addQuiz(courseSnapshot,weightage,questions,dueDate,quizCollectionRef){
    if((courseSnapshot.data().currentWeight + parseInt(weightage)) <= 100){
        await setDoc(quizCollectionRef, { questions,weightage,dueDate:dueDate});
    }else{
        alert('The weightage of all your assignments is greater than 100!');
        return false;
    }

}



export async function addEssay(courseSnapshot,questionPrompt,weightage,dueDate,essayCollectionRef){
    if((courseSnapshot.data().currentWeight + parseInt(weightage)) <= 100){
        await setDoc(essayCollectionRef, { questionPrompt,weightage,dueDate:dueDate});
    }else{
        alert('The weightage of all your assignments is greater than 100!');
        return false;
    }
}


// export async function addEssay(co,weightage,prompt,dueDate,essayCollectionRef){
  
//     const courseData = courseSnapshot.data();
//     const currentAssignments = courseData.currentAssignments || [];

//     currentAssignments.push(quizCollectionRef.id);
//     await setDoc(courseCollectionRef,{...courseData,currentWeight:courseSnapshot.data().currentWeight+parseInt(weightage)});
// }
