k@extends('layouts.app')

@section('content')
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Timesheet</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Timesheet</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Timesheet List</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="xtm-table" class="table table-bordered table-striped" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Signum</th>
                                    <th>Description</th>
                                    <th>Leave Start</th>
                                    <th>Leave End</th>
                                    <th>Logged at</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
    <!-- /.content -->

    <div class="modal fade" id="modal-xl">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Mass Validation</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="float-left btn btn-default" data-dismiss="modal">Close</button>
                    <div class="btn-group">
                        <button id="mass-validation" type="button" class="btn btn-outline-success">Validate all</button>
                        <button id="mass-rejection" type="button" class="btn btn-outline-danger">Reject all</button>
                    </div>
                </div>
            </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</div>
<!-- Scripts -->
<script>
    $(function () {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        var oTable = $("#xtm-table").DataTable({
            ajax: {url: "{{ url('report/work-leave') }}", dataSrc:""},
            processing: true,
            responsive: true,
            columns: 
            [
                { data: 'id', name: 'id', visible: false },
                { data: 'signum', name: 'signum' },
                { data: 'leave_description', name: 'description' },
                { data: 'leave_start_date', name: 'leave_start_date' },
                { data: 'leave_end_date', name: 'leave_end_date' },
                { data: 'submitted_date', name: 'submitted_date' },
                { data: 'leave_type', name: 'leave_type', class: 'text-center' },
                { data: 'status', name: 'status', class: 'text-center' }
            ],
            columnDefs: [
                {
                    targets : [3],
                    render : function(data, type, row) {
                        const months = ["Jan", "Feb", "Mar", "Apr", 
                                        "May", "Jun", "Jul", "Aug", 
                                        "Sep", "Oct", "Nov", "Dec"];
                        let date = Date.parse(data);
                        let f = new Date(date);

                        let formatted_date = f.getDate() + " " + months[f.getMonth()] + " " + f.getFullYear();
                        
                        return "<span class='badge badge-dark'>" + addZero(f.getHours()) + ":" + addZero(f.getMinutes()) + ":" + addZero(f.getSeconds()) +"</span> "+formatted_date;
                    }
                },
                {
                    targets : [4],
                    render : function(data, type, row) {
                        const months = ["Jan", "Feb", "Mar", "Apr", 
                                        "May", "Jun", "Jul", "Aug", 
                                        "Sep", "Oct", "Nov", "Dec"];
                        let date = Date.parse(data);
                        let f = new Date(date);

                        let formatted_date = f.getDate() + " " + months[f.getMonth()] + " " + f.getFullYear();
                        
                        return "<span class='badge badge-secondary'>" + addZero(f.getHours()) + ":" + addZero(f.getMinutes()) + ":" + addZero(f.getSeconds()) +"</span> "+formatted_date;
                    }
                },
                {
                    targets : [5],
                    render : function(data, type, row) {
                        const months = ["Jan", "Feb", "Mar", "Apr", 
                                        "May", "Jun", "Jul", "Aug", 
                                        "Sep", "Oct", "Nov", "Dec"];
                        let date = Date.parse(data);
                        let f = new Date(date);

                        let formatted_date = f.getDate() + " " + months[f.getMonth()] + " " + f.getFullYear();
                        
                        return "<span class='badge badge-info'>" + addZero(f.getHours()) + ":" + addZero(f.getMinutes()) + ":" + addZero(f.getSeconds()) +"</span> "+formatted_date;
                    }
                },
                {
                    targets : [6],
                    render : function (data, type, row) {
                        if ( data == 'non_working_day' ) 
                        {
                            return '<span class="badge badge-info">Non-working day</span>';
                        }
                        else if ( data == 'sick_leave' ) 
                        {
                            return '<span class="badge badge-info">Sick leave</span>';
                        }
                        else if ( data == 'vacation_day' ) 
                        {
                            return '<span class="badge badge-info">Vacation</span>';
                        }
                        else
                        {
                            return '<span class="badge badge-warning">Undefined</span>';
                        }
                    }
                },
                {
                    targets : [7],
                    render : function (data, type, row) {
                        if ( data == 'need_approval' ) 
                        {
                            return '<span class="badge badge-light">Awaiting validation</span>';
                        }
                        else if ( data == 'pre_approved' ) 
                        {
                            return '<span class="badge badge-light">Awaiting level 2 validation</span>';
                        }
                        else if ( data == 'approved' ) 
                        {
                            return '<span class="badge badge-success">Validated</span>';
                        }
                        else if ( data == 'rejected' ) 
                        {
                            return '<span class="badge badge-danger">Rejected</span>';
                        }
                        else 
                        {
                            return '<span class="badge badge-warning">Undefined</span>';
                        }
                    }
                }
            ],
        });
    });
</script>
@endsection