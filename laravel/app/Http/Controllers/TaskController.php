<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
    	$task = Task::all();
        return $task;
    }

    public function create(Request $request)
    {
    	$colors = ['#2D3142','#F3AA19','#90A194','#941B0C','#007E3E','#621708','#246EB9','#133C55','#628395'];
        $task = new Task();
        $task->name = $request->name;
        $task->description = $request->description;
        $task->color = $colors[rand(0, count($colors)-1)]; 
        $task->save();
        return $task;
    }

    public function show(Request $request)
    {
        $task = Task::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
        $task = Task::findOrFail($request->id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->save();

        return $task;
       
    }

    public function destroy(Request $request)
    {
        $task = Task::destroy($request->id);
        return $task;
    }
    
    public function tasksWithTime()
    {
        
        $tasks = Task::with('time_trackers')->get();
        foreach ($tasks as $i => $task) {
            $tasks[$i]['time_trackers'] = $task->getTime();
        }
        return $tasks;
    }

}
