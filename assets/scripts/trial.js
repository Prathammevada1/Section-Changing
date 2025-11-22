
class Helper{
  static switchInDom(id){
    // const section = document.getElementById(id).parentElement.parentElement;
    // dont do this cause if html structure changes it would break easily
    const li=document.getElementById(id);
    const section = li.closest('section');
    const button = li.querySelector('button:last-of-type')

    if(section.id==='active-projects'){
      button.textContent='Activate';
      document.querySelector('#finished-projects ul').append(li)
    }
    else{
      button.textContent='Finish';
      document.querySelector('#active-projects ul').append(li)
    }
  }

  static moreInfoDom(){

    const li=document.getElementById(this.id)
    if(li.querySelector('.card')) return;
    const extraInfo = li.getAttribute('data-extra-info');
    const div=document.createElement('div')
    const closeButton=document.createElement('button');
    closeButton.textContent="Close";
    closeButton.classList.add("close-button");
    div.innerHTML=`<h4>${extraInfo}</h4>`;
    div.classList.add('card')
    li.append(div);
    div.append(closeButton);

    this.closeButtonHandler(closeButton);
  }
}

class ProjectItem{
  constructor(id,switchHandler){
    this.id=id;
    this.switchHandler=switchHandler;
    this.addButtonListener();
  }
  addButtonListener(){
    const liselector=document.getElementById(this.id);
    const button = liselector.querySelector('button:last-of-type');
    button.addEventListener('click',()=>this.switchHandler(this.id));
  }


}
class ProjectList{
  projects=[];

  constructor(type){
    this.type=type;
    const sectionul= document.querySelectorAll(`#${this.type}-projects ul li`);
    for(const element of sectionul){
      this.projects.push(new ProjectItem(element.id,this.switch.bind(this)))
      new ToolTip(element.id);
    }
    // console.log(this.projects)
  }

  switching(ref){
    this.ref=ref;
  }


  switch(id){
    const liTag = this.projects.find((ele)=>ele.id===id); 

    if (liTag)
    {
      this.ref.projects.push(liTag)
      this.projects.splice(this.projects.indexOf(liTag),1)
    }
    Helper.switchInDom(id);
  }
}

class ToolTip{

  constructor(id){
    this.id=id;
    this.moreInfo();
  }

  handleCloseButtonClick(e){
    e.target.parentElement.remove();  
  }


  closeButtonHandler(closeButton){
    closeButton.addEventListener('click',this.handleCloseButtonClick.bind(this))
  }

  moreInfo(){
    const li=document.getElementById(this.id);
    const button=li.querySelector('button:first-of-type');//avoid button as html can change 
    button.addEventListener('click',Helper.moreInfoDom.bind(this))
  }

}

class App{
  static init(){
    const activeProject=new ProjectList('active');
    const finishedProject=new ProjectList('finished');
    activeProject.switching(finishedProject);
    finishedProject.switching(activeProject);
  }
}
App.init();

