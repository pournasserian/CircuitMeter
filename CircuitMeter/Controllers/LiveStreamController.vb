Imports System.Net
Imports System.Web.Script.Serialization

Public Class LiveStreamController
    Inherits BaseController

    '{"datapoint":["volts"], "operator":["last"], "timewindow":30, "xAxis":"phase", "yAxis":"mid", "sortXAxis":"x", "sortYAxis":"a", "filters":{ }, "time_zone": "EST", "refreshRate": 2000,"ApiCall":true,"fontSize":"18px","callback":"pt_PanelColors(pt)"}
    '{"datapoint":["volts"], "operator":["last"], "timewindow":30, "xAxis": "phase", "yAxis":"mid","sortXAxis":"x", "sortYAxis":"a", "filters":{ }, "time_zone": "ETS", "refreshRate": 2000,"ApiCall":true,"fontSize":"18px","callback":"pt_PanelColors(pt)"}

    Public Function GetValues() As LiveStreamResponseModel

        Dim requestData As New LiveStreamRequestModel
        With requestData
            .datapoint.Add("volts")
            .operator.Add("last")
            .timewindow = 30
            .xAxis = "phase"
            .yAxis = "mid"
            .sortXAxis = "x"
            .sortYAxis = "a"
            '.filters=
            .time_zone = "EST"
            .refreshRate = 2000
            .ApiCall = True
            '.fontSize=
            '.callback=
        End With

        Dim responseString As String = ApiRequest("ptg", requestData)
        Dim jsonDeserializer As New JavaScriptSerializer()
        Dim data = jsonDeserializer.DeserializeObject(responseString)

        Dim result As New LiveStreamResponseModel
        result.Time = CDate(data.item("time"))

        For Each item In data.item("result").item("rowData")(0)
            result.Values.Add(item)
        Next

        Return result

    End Function

End Class
