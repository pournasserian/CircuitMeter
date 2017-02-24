Imports System.Net.Http
Imports System.Web.Configuration
Imports System.Web.Http

Public Class BaseController
    Inherits ApiController

    Public ReadOnly Property API_KEY As String = ""
    Public ReadOnly Property BASE_URL As String = ""


    Public Sub New()
        API_KEY = WebConfigurationManager.AppSettings.Item("api_key")
        BASE_URL = WebConfigurationManager.AppSettings.Item("base_url")
    End Sub

    Private Function CreateApiUrl(url As String) As String
        Return BASE_URL & url & "&api_key=" & API_KEY
    End Function

    Public Function ApiRequest(url As String) As String

        Dim result As String = ""

        Using client As New HttpClient()
            result = client.GetAsync(CreateApiUrl(url)).Result.Content.ReadAsStringAsync.Result
        End Using

        Return result

    End Function

End Class
