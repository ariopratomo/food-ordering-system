<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    // fillable
    protected $fillable = [
        'order_id',
        'food_id',
        'quantity',
        'price',
    ];
}
