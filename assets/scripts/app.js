
class DOMHelper{
  static moveElement(elementId,newDestinationSelector){
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}


class ToolTip{

}

class ProjectItems{
  constructor(id,udpateProjectListFunction){
    this.id=id;
    this.updateProjectListHandler = udpateProjectListFunction; 
    this.connectMoreInfo();
    this.connectSwitchButton();
  }
  connectMoreInfo(){
    
  }

  connectSwitchButton(){
    const projectItemElement=document.getElementById(this.id);
    const switchButton = projectItemElement.querySelector('button:last-of-type');
    switchButton.addEventListener('click',this.updateProjectListHandler.bind(null,this.id ));
  }
}

class ProjectList{

  projects=[];

  constructor(type){
    this.type=type;
    const projectItems=document.querySelectorAll(`#${type}-projects li`)//li selector
    // console.log(projectItems)
    for(const element of projectItems){
      this.projects.push(new ProjectItems(element.id,this.switchProject.bind(this)))
    }
    // console.log(this.projects)
  }

  setSwitchHandler(switchHandlerFunction){
    this.switchHandler=switchHandlerFunction;
  }

  addProject(project){
    console.log(project);
    this.projects.push(project);
    DOMHelper.moveElement(project.id,`#${this.type}-projects ul`)
  }

  switchProject(projectId){
    // const projectIndex = this.projects.findIndex(p=>p.id===projectId);
    // this.projects.splice(projectIndex,1);
    this.switchHandler(this.projects.find(p=>p.id===projectId));
    this.projects=this.projects.filter(p=>p.id!=projectId);

  }

}

class App{
  static init(){
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandler(finishedProjectList.addProject.bind(finishedProjectList));
    finishedProjectList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList));
  }
}
App.init();