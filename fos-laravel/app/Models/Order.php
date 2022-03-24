<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // fillable
    protected $fillable = [
        'order_number',
        'table_number',
        'status',
        'total_price',
    ];

}
