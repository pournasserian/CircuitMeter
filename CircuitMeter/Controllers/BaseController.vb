Imports System.Net.Http
Imports System.Web.Configuration
Imports System.Web.Http
Imports System.Web.Script.Serialization

Public Class BaseController
    Inherits ApiController

    Public ReadOnly Property API_KEY As String = ""
    Public ReadOnly Property BASE_URL As String = ""


    Public Sub New()
        API_KEY = WebConfigurationManager.AppSettings.Item("api_key")
        BASE_URL = WebConfigurationManager.AppSettings.Item("base_url")
    End Sub

    Private Function GetApiUrl(url As String) As String
        Return BASE_URL & "api/" & url & "&api_key=" & API_KEY
    End Function

    Public Function ApiRequest(url As String) As String

        Dim result As String = ""

        Using client As New HttpClient()
            result = client.GetAsync(GetApiUrl(url)).Result.Content.ReadAsStringAsync.Result
        End Using

        Return result

    End Function

    Public Function ApiRequest(url As String, requestModel As LiveStreamRequestModel) As String

        Dim result As String = ""

        Dim jsonSerializer As New JavaScriptSerializer()
        Dim jsonObject = jsonSerializer.Serialize(requestModel)
        Dim jsonString As String = jsonObject.ToString()
        Dim content As New StringContent(jsonString, Encoding.UTF8, "application/json")

        Using client As New HttpClient()
            result = client.PostAsync(GetApiUrl(url), content).Result.Content.ReadAsStringAsync.Result
        End Using

        Return result

    End Function

End Class
