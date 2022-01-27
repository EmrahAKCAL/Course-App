//Cuorse  constructor
function Course(title, instructor, image){
    this.title=title;
    this.instructor=instructor;
    this.image=image;
}

//UI constructor
function UI(){}

UI.prototype.addCourseToList=function(course){
    const list=document.getElementById('course-list');

    var html= ` 
        <tr>
            <td class="img-box"><img class="list-img" src= "images/${course.image}"/> </td>
            <td class="list-title">${course.title}</td>
            <td class="list-intructor">${course.instructor} </td>
            <td class="list-dlt"><a href="#" class="btn-delete">Delete</a> </td>
        </tr>
    `;
    
    list.innerHTML +=html;

}

UI.prototype.celarControls=function(){
    const title=document.getElementById('title').value="";
    const instructor=document.getElementById('instructor').value="";
    const image=document.getElementById('image').value="";
}


UI.prototype.deleteCours=function(element){
    if(element.classList.contains('btn-delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert=function(message, className){
    var alert=`
        <div class="alert alert-${className}"> ${message}</div>
    `;
    const row= document.querySelector('.row');
    row.insertAdjacentHTML('beforebegin', alert);

    setTimeout(()=>{ document.querySelector('.alert').remove(); },3000);
}


document.getElementById('new-course').addEventListener('submit', function(event){

    const title=document.getElementById('title').value;
    const instructor=document.getElementById('instructor').value;
    const image=document.getElementById('image').value;

    //Create course object
    const course=new Course(title, instructor, image);
    
    //create UI
    const ui=new UI();

    if(title.trim()=='' || instructor.trim()=='' || image.trim()==''){
        ui.showAlert('Please complete the form', 'warning');
    }
    else{
        //add course to list
        ui.addCourseToList(course);
    
        //clear controls
        ui.celarControls();

        ui.showAlert('The course has been added', 'success');

    }
    

    event.preventDefault();
});

document.getElementById('course-list').addEventListener('click', function(event){
    const ui= new UI();
    ui.deleteCours(event.target);

    ui.showAlert('The course has been deleted', 'danger');
});