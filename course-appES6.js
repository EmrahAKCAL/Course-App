//course class constructor
class Course{
    constructor(title, instructor, image){
        this.courseId=Math.floor(Math.random()*10000);
        this.title=title;
        this.instructor=instructor;
        this.image=image;
    }
}

//UI class
class UI{
    addCourseToList(course){
        const list=document.getElementById('course-list');
        
        //creat list element
        var html= ` 
            <tr>
                <td class="img-box"><img class="list-img" src= "images/${course.image}"/> </td>
                <td class="list-title">${course.title}</td>
                <td class="list-intructor">${course.instructor} </td>
                <td class="list-dlt"><a href="#" data-id="${course.courseId}" class="btn-delete">Delete</a> </td>
            </tr>`;
    list.innerHTML +=html;
    }

    clearControls(){
        const title=document.getElementById('title').value="";
        const instructor=document.getElementById('instructor').value="";
        const image=document.getElementById('image').value="";
    }

    //delete element
    deleteCours(element){
        if(element.classList.contains('btn-delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }

    //Alert message
    showAlert(message, className){
        var alert=`<div class="alert alert-${className}"> ${message} </div>`;
        const row= document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin', alert);
        
        setTimeout(()=>{
            document.querySelector('.alert').remove();},3000);
        }
}

    //class storage
class Storage{
        static getCourses(){
            let courses;
            if(localStorage.getItem('courses')===null){
                courses=[];
            }
            else{
                courses=JSON.parse(localStorage.getItem('courses'));
            }
            return courses;
        }
        
        static displayCourses(){
            const courses=Storage.getCourses();
            courses.forEach(course => {
                const ui= new UI();
                ui.addCourseToList(course);
            });
        }
        
        static addCourse(course){
            const courses=Storage.getCourses();
            courses.push(course);
            localStorage.setItem('courses', JSON.stringify(courses));
        }
        
        static deleteCourse(element){
            if(element.classList.contains('btn-delete')){
            const id=element.getAttribute('data-id');
            const courses= Storage.getCourses();
            
            courses.forEach((course, index)=>{
                if(course.courseId==id){
                    courses.splice(index, 1);
                }
             });
             localStorage.setItem('courses', JSON.stringify(courses));
            }
        }
}
    

document.addEventListener('DOMContentLoaded', Storage.displayCourses);


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

        //Save To Local Storage
        Storage.addCourse(course);
    
        //clear controls
        ui.celarControls();

        ui.showAlert('The course has been added', 'success');

    }
    
    
    event.preventDefault();
});

document.getElementById('course-list').addEventListener('click', function(event){
    const ui= new UI();

    //delete course
    if(ui.deleteCours(event.target)==true){
        
    //delete from local storage
    Storage.deleteCourse(event.target);

    ui.showAlert('The course has been deleted', 'danger');
    };
});