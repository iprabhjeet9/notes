const fs = require('fs')
const chalk = require('chalk')

const loadNote = (file)=>{
    try{
        const data = JSON.parse(fs.readFileSync(file).toString())
        return data
    } catch(e){
        return []
    }
}

const saveNote = (data)=>{
    const jsondata=JSON.stringify(data)
    fs.writeFileSync('data.json',jsondata)
}


const addNote= (title,body)=>{
    console.log("Adding.....")
    const data = loadNote('data.json')
    const duplicate = data.filter(function(note){
        return (note.title===title)
    })

    if (duplicate.length===0){
        data.push({
            title: title,
            body: body
        })
        saveNote(data)  
    } else {
        console.log(chalk.red("Duplicate entry, please use diff title."))
    }

}

const removeNote = (title)=>{
    const notes= loadNote('data.json')
    const notesToKepp=notes.filter(function(note){
        return note.title !== title
    })
    if (notesToKepp.length===notes.length){
        console.log(chalk.red(title," this is not present."))
    } else{
        
    saveNote(notesToKepp)
    console.log(chalk.green("note is deleted."))
    }
}

const readNote=(title)=>{
    const notes =loadNote('data.json')
    const note = notes.filter((note)=>{
        return note.title===title
    })
    if (note.length===0){
        console.log(chalk.blue("No note with this title: ",title))
    }else{
        note.forEach((note) => {
            console.log(chalk.green.inverse("Your note"))
            console.log("Title : ",note.title)
            console.log("Body : ",note.body)
        })
    }
   
}


const listNotes=()=>{
    const notes= loadNote('data.json')
    if (notes.length>0){
        console.log(chalk.blue("List of notes....."))
        notes.forEach((note)=>console.log(chalk.green(note.title)))
    }else{
        console.log(chalk.red("NO notes present. Please add using add command."))
    }
}

module.exports={
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}