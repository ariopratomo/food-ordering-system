<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // set validation rules
        $validator = Validator::make($request->all(), [
            'table_number' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'food_id' => 'required',
            'quantity' => 'required|numeric',
            'price' => 'required|numeric',

        ]);
        // order number each with format ABCddmmyyyy-number+1
        $order_number = 'ABC' . date('dmY') . '-' . Order::count() + 1;

        // if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        // db transaction
        try {
            DB::beginTransaction();
            // create order
            $order = Order::create([
                'order_number' => $order_number,
                'table_number' => $request->table_number,
                'status' => $request->status,
                'total_price' => 0
            ]);
            // if order is created
            if ($order) {
                // get order_id from last created order
                $order_id = $order->id;
                // create each order_detail
                foreach ($request->food_id as $key => $food_id) {
                    $order_detail = OrderDetail::create([
                        'order_id' => $order_id,
                        'food_id' => $food_id,
                        'quantity' => $request->quantity[$key],
                        'price' => $request->price[$key]
                    ]);
                    // if order_detail is created
                    if ($order_detail) {
                        // update total_price
                        $order->total_price += $request->price[$key] * $request->quantity[$key];
                        $order->save();
                    }
                }
            }
            // commit transaction
            DB::commit();
            // return response
            return response()->json([
                'success' => true,
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
            // rollback transaction
            DB::rollback();
            // return error
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 409);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
