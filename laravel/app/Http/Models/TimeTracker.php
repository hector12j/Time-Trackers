<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class TimeTracker extends Model
{
    protected $fillable = ['name', 'descript', 'color'];

    public function task()
    {
        return $this->belongsTo('App\Http\Models\Task');
    }
}
