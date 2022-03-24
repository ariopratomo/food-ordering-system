<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // if jwt auth role is waiter get all foods that are ready
        if (auth()->user()->role == 'waiter') {
            $foods = Food::where('is_ready', true)->get();
        } else {
            $foods = Food::all();
        }
        // return response
        return response()->json([
            'success' => true,
            'foods' => $foods
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

         // validator
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'category' => 'required',
        ]);
        // if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        // set is_ready to false
        $request->is_ready = false;
        // create food
        $food = Food::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $request->image,
            'category' => $request->category,
            'is_ready' => $request->is_ready,
        ]);
        // return response JSON food is created
        if($food) {
            return response()->json([
                'success' => true,
                'food' => $food
            ], 201);
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
        // show food
        $food = Food::find($id);
        // return response JSON food is found
        if($food) {
            return response()->json([
                'success' => true,
                'food' => $food
            ], 200);
        }
        // return error if food is not found
        return response()->json([
            'success' => false,
        ], 404);

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
        // edit food
        $food = Food::find($id);
        // check if food is found
        if($food) {
            // set validation rules
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'description' => 'required|string|max:255',
                'image' => 'required|string|max:255',
                'category' => 'required',
            ]);
            // if validation fails
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }
            // update food
            $food->update([
                'name' => $request->name,
                'price' => $request->price,
                'description' => $request->description,
                'image' => $request->image,
                'category' => $request->category,
                'is_ready' => $request->is_ready,
            ]);
            // return response JSON food is updated
            if($food) {
                return response()->json([
                    'success' => true,
                    'food' => $food
                ], 200);
            }
        }
        // return error if food is not found
        return response()->json([
            'success' => false,
        ], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete food
        $food = Food::find($id);
        $food->delete();
        // return response JSON food is deleted
        if($food) {
            return response()->json([
                'success' => true,
                'food' => $food
            ], 200);
        }
    }

    // get all ready foods
    public function getReadyFoods()
    {
        // get all ready foods
        $foods = Food::where('is_ready', true)->get();
        // return response JSON foods are found
        if($foods) {
            return response()->json([
                'success' => true,
                'foods' => $foods
            ], 200);
        }
        // return error if foods are not found
        return response()->json([
            'success' => false,
        ], 404);
    }

    // get all unready foods
    public function getUnreadyFoods()
    {
        // get all unready foods
        $foods = Food::where('is_ready', false)->get();
        // return response JSON foods are found
        if($foods) {
            return response()->json([
                'success' => true,
                'foods' => $foods
            ], 200);
        }
        // return error if foods are not found
        return response()->json([
            'success' => false,
        ], 404);
    }
}
