<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;
use RealRashid\SweetAlert\Facades\Alert;

use App\Approval;
use App\Timesheet;
use App\General;
use DateTime;
use App\Http\Controllers\GlobalController as GlobalControl;

class TimesheetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Load views
    public function index()
    {
        return view('timesheet/index');
    }

    public function create()
    {
        $current_week = date('W');
        $current_year = date('Y');

        // dd(Auth::user());

        return view('timesheet/create', compact(['current_week', 'current_year']));
    }

    // AJAX Action
    public function submit(Request $request)
    {
        $user = Auth::user();

        $submit = new Timesheet();
        $submit->signum = $user->signum;
        $submit->email = $user->email;

        // Get Dates range of a given Week of current Year
        $dates = $this->getStartAndEndDate($request->week, date('Y'));
        $submit->week_num = $request->week;
        $submit->range_start = $dates['week_start'];
        $submit->range_end = $dates['week_end'];

        // Get Signum
        $first = DB::table('M_SIGNATORY')->select('signum')->find($request->first);
        $second = DB::table('M_SIGNATORY')->select('signum')->find($request->second);
        $submit->first_signatory = $first->signum;
        $submit->second_signatory = $second->signum;

        $submit->comments = $request->comments;

        $submit->save();
    }

    // AJAX Fetch
    public function dateRangeAjax()
    {
        $weeks = $this->getWeeksInYear(date('Y'));

        $response = array();
        
        for ( $i = 1; $i <= $weeks; $i++)
        {
            $dates = $this->getStartAndEndDate($i, date('Y'));

            $response[] = array(
                'id' => $i,
                'text' => 'Week '.$i.' - '.date('d-M-Y', strtotime($dates['week_start'])).' to '.date('d-M-Y', strtotime($dates['week_end']))
            );
        }

        echo json_encode($response);
        exit;
    }

    public function signatoryAjax(Request $request)
    {
        $query = $request->search;

        $obj = new General;
        $res = $obj->getSignatory($query);

        $response = array();

        foreach ( $res as $data )
        {
            if ( $data->signum != null && $data->signum != '' )
            {
                $response[] = array(
                    'id' => $data->id,
                    'text' => $data->signum.' / '.$data->name
                );
            }
        }

        echo json_encode($response);
        exit;
    }

    // Helper functions
    public function getWeeksInYear($year)
    {
        $date = new DateTime();
        $date->setISODate($year, 53);
        return ($date->format("W") === "53" ? 53 : 52);
    }

    function getStartAndEndDate($week, $year) {
        $dto = new DateTime();
        $dto->setISODate($year, $week);
        $ret['week_start'] = $dto->format('Y-m-d');
        $dto->modify('+6 days');
        $ret['week_end'] = $dto->format('Y-m-d');
        return $ret;
    }
}
