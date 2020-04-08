<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\TimeTracker;

class TimeTrackerController extends Controller
{
	public function index()
    {
    	$timers = TimeTracker::all();
        return $timers;
    }

    public function create(Request $request)
    {
        $tracker = new TimeTracker();
        $tracker->time = $request->time;
        $tracker->task_id = $request->task_id;
        $tracker->save();
        return $tracker;
    }
}
