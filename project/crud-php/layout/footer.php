<footer class="main-footer">
    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery UI 1.11.4 -->
<script src="assets-template/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- jQuery -->
<script src="assets-template/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="assets-template/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<!-- Bootstrap 4 -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<!-- DataTables -->
<script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
<!-- AdminLTE App -->
<script src="assets-template/dist/js/adminlte.min.js"></script>
<!-- Page specific script -->
<script>
  $(document).ready(function() {
    $('#table').DataTable();
  });
</script>

<script>
  $(document).ready(function() {
    $('#serverside').DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        "url": "mahasiswa-serverside.php?action=table_data",
        "dataType": "json",
        "type": "POST"
      } ,
      columns: [
        {"data": "no"},
        {"data": "nama"},
        {"data": "prodi"},
        {"data": "jk"},
        {"data": "telepon"},
        {"data": "aksi"},
      ]

    });
  });
</script>

<!-- ckeditor -->
<script src="https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"></script>
<script>
    CKEDITOR.replace('alamat', {
      filebrowserBrowseUrl: 'assets/ckfinder/ckfinder.html',
      filebrowserUploadUrl: 'assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
      height: '400px'
    });
</script>
</body>
</html>
