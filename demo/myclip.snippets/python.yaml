## get full details for python exception
## including the filename and line number
try:
  MainProcedure()
except Exception as msg:
  print 'UNEXPECTED TERMINATION msg@%s'%(msg.__repr__())
  exc_type, exc_obj, exc_tb = sys.exc_info()
  fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
  print(exc_type, fname, exc_tb.tb_lineno)
