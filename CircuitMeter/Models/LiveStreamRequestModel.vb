'{"datapoint":["volts"], "operator":["last"], "timewindow":30, "xAxis":"phase", "yAxis":"mid", 
'"sortXAxis":"x", "sortYAxis":"a", "filters":{ }, "time_zone": "EST", "refreshRate": 2000,
'"ApiCall":true,"fontSize":"18px","callback":"pt_PanelColors(pt)"}

Public Class LiveStreamRequestModel

    Public Property datapoint As New List(Of String)
    Public Property [operator] As New List(Of String)
    Public Property timewindow As Integer = 30
    Public Property xAxis As String
    Public Property yAxis As String
    Public Property sortXAxis As String
    Public Property sortYAxis As String
    Public Property filters As New Object
    Public Property time_zone As String = "EST"
    Public Property refreshRate As Integer = 2000
    Public Property ApiCall As Boolean = True
    Public Property fontSize As String = "18px"
    Public Property callback As String = "pt_PanelColors(pt)"


End Class
