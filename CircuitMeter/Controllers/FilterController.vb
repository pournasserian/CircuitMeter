Public Class FilterController
    Inherits BaseController

    Public Function GetValues(endpoint As String) As String
        Return ApiRequest(endpoint)
    End Function

End Class
