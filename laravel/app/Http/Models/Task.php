<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Task extends Model
{
    protected $fillable = ['name', 'descript', 'color'];

    public function time_trackers()
    {
        return $this->hasMany('App\Http\Models\TimeTracker');
    }
    // funtion to get task time for today
    public function getTime()
	{
		$today = Carbon::now()->startOfDay();
    	$time = 0;
    	foreach ($this->time_trackers as $i => $tracker) {
    		if ($tracker->created_at->isToday()) {
    			$time += intval($tracker['time']);
    		}
    	}
    	$this->attributes['time'] = $time;
	}
}
