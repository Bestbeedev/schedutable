<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class AcademicYear extends Model
{
    use HasUuid;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['label', 'is_active', 'university_id'];

    public function university()
    {
        return $this->belongsTo(University::class);
    }
}
