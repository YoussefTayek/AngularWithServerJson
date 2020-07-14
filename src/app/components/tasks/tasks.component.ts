import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ok } from 'assert';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    tasks: Task[] = [];
    resultTasks: Task[] = [];
    searchText = '';
    editForm = false;
    showForm = false;
    myTask: Task = {
    label: '',
    completed: false
  };
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  changeTask() {
    this.showForm = !this.showForm;
  }

  searchTask() {
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  getTasks() {
    this.taskService.findAll().subscribe(
      tasks => this.tasks = this.resultTasks = tasks
      );
  }

  deleteTask(id) {
    this.taskService.deleteOne(id).subscribe(data => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  persistTask() {
    this.taskService.persist(this.myTask).subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
      this.showForm = false;
    }
    );
  }

  resetTask() {
    this.myTask =  {
      label: '',
      completed: false
    };
  }

  onChange(id, task) {
    this.taskService.completed(id, task.completed).subscribe(() => {
    task.completed = !task.completed;
  });
  }
  taskEdit(task) {
    this.myTask = task;
    this.editForm = true;
  }

  updateTask() {
    this.taskService.update(this.myTask).subscribe(() => {
      this.resetTask();
      this.editForm = false;
    });
  }
}
