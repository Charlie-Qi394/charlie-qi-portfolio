Option Explicit
Public Const MaxScenarios As Long = 5
Private Const SnapshotRows As Long = 147

Public Sub SaveSupplyScenario()
    SaveWithPrompt "Supply Plan"
End Sub

Public Sub SaveCostScenario()
    SaveWithPrompt "Cost Optimisation"
End Sub

Private Function StageColumn(ByVal sheetName As String) As Long
    If sheetName = "Cost Optimisation" Then StageColumn = 14 Else StageColumn = 13
End Function

Private Function CurrentKey(ByVal sheetName As String) As String
    Dim ws As Worksheet, m As Worksheet, rules As Worksheet, r As Range, cell As Range
    Dim key As String, v As String, stockColumn As Long, area As Variant
    Set ws = ThisWorkbook.Worksheets(sheetName)
    Set m = ThisWorkbook.Worksheets("Model")
    Set rules = ThisWorkbook.Worksheets("Formulation Rules")
    key = sheetName
    For Each area In Array("B6:B8", "B15:D26", "C31:D35")
        For Each cell In ws.Range(CStr(area)).Cells
            v = CStr(cell.Value2): key = key & "|" & Len(v) & ":" & v
        Next cell
    Next area
    If sheetName = "Cost Optimisation" Then
        For Each cell In ws.Range("E15:E26").Cells
            v = CStr(cell.Value2): key = key & "|" & Len(v) & ":" & v
        Next cell
        stockColumn = 3
    Else
        stockColumn = 2
    End If
    For Each cell In ThisWorkbook.Worksheets("Other Stock").Range(CellsAddress(stockColumn)).Cells
        v = CStr(cell.Value2): key = key & "|" & Len(v) & ":" & v
    Next cell
    For Each area In Array("B5:C19", "C22:D33")
        For Each cell In rules.Range(CStr(area)).Cells
            v = CStr(cell.Value2): key = key & "|" & Len(v) & ":" & v
        Next cell
    Next area
    For Each area In Array("C5:D16", "G5:N16")
        For Each cell In m.Range(CStr(area)).Cells
            v = CStr(cell.Value2): key = key & "|" & Len(v) & ":" & v
        Next cell
    Next area
    For Each area In Array("B20:C20", "C21:D30", "B31:B34")
        For Each cell In m.Range(CStr(area)).Cells
            v = CStr(cell.Formula): key = key & "|" & Len(v) & ":" & v
        Next cell
    Next area
    CurrentKey = key
End Function

Private Function CellsAddress(ByVal stockColumn As Long) As String
    If stockColumn = 3 Then CellsAddress = "C7:C16" Else CellsAddress = "B7:B16"
End Function

Public Function CanSaveScenario(ByVal sheetName As String) As Boolean
    Dim ws As Worksheet, data As Worksheet, col As Long, status As String
    On Error GoTo NotCurrent
    Set ws = ThisWorkbook.Worksheets(sheetName)
    Set data = ThisWorkbook.Worksheets("Scenario Data")
    col = StageColumn(sheetName)
    status = CStr(ws.Range("A10").Value2)
    If InStr(1, status, "Stock plan calculated", vbTextCompare) <> 1 And InStr(1, status, "Lowest-cost feasible formulation", vbTextCompare) <> 1 Then Exit Function
    If WorksheetFunction.Count(ws.Range("C15:C26")) <> 12 Then Exit Function
    If Len(data.Cells(128, col).Value2) = 0 Then Exit Function
    CanSaveScenario = (CStr(data.Cells(128, col).Value2) = CurrentKey(sheetName))
NotCurrent:
End Function

Public Sub RememberCalculation(ByVal sheetName As String)
    Dim ws As Worksheet, data As Worksheet, m As Worksheet, rules As Worksheet
    Dim col As Long, stockColumn As Long, i As Long
    Set ws = ThisWorkbook.Worksheets(sheetName)
    Set data = ThisWorkbook.Worksheets("Scenario Data")
    Set m = ThisWorkbook.Worksheets("Model")
    Set rules = ThisWorkbook.Worksheets("Formulation Rules")
    col = StageColumn(sheetName)
    If sheetName = "Cost Optimisation" Then stockColumn = 3 Else stockColumn = 2
    data.Range(data.Cells(1, col), data.Cells(SnapshotRows, col)).ClearContents
    data.Cells(2, col).Value2 = CDbl(Now)
    data.Cells(3, col).Value2 = sheetName
    data.Range(data.Cells(5, col), data.Cells(7, col)).Value2 = ws.Range("B6:B8").Value2
    If sheetName = "Cost Optimisation" Then
        data.Cells(8, col).Value2 = ws.Range("D7").Value2
        data.Cells(9, col).Value2 = ws.Range("F7").Value2
        data.Cells(10, col).Value2 = ws.Range("D9").Value2
        data.Cells(11, col).Value2 = ws.Range("F9").Value2
        data.Cells(12, col).Value2 = ws.Range("G11").Value2
        data.Range(data.Cells(64, col), data.Cells(75, col)).Value2 = ws.Range("E15:E26").Value2
    End If
    data.Range(data.Cells(13, col), data.Cells(17, col)).Value2 = ws.Range("C31:C35").Value2
    data.Cells(18, col).Value2 = rules.Range("B19").Value2
    data.Cells(19, col).Value2 = (m.Range("B24").Value2 - m.Range("B32").Value2) / m.Range("B28").Value2
    data.Cells(20, col).Value2 = ws.Range("C27").Value2
    data.Range(data.Cells(25, col), data.Cells(36, col)).Value2 = ws.Range("B15:B26").Value2
    data.Range(data.Cells(38, col), data.Cells(49, col)).Value2 = ws.Range("C15:C26").Value2
    data.Range(data.Cells(51, col), data.Cells(62, col)).Value2 = ws.Range("D15:D26").Value2
    data.Cells(77, col).Value2 = ws.Range("B7").Value2
    data.Cells(78, col).Value2 = ws.Range("B8").Value2
    data.Range(data.Cells(79, col), data.Cells(88, col)).Value2 = ThisWorkbook.Worksheets("Other Stock").Range(CellsAddress(stockColumn)).Value2
    data.Range(data.Cells(90, col), data.Cells(99, col)).Value2 = rules.Range("B5:B14").Value2
    data.Range(data.Cells(101, col), data.Cells(110, col)).Value2 = rules.Range("C5:C14").Value2
    data.Range(data.Cells(112, col), data.Cells(117, col)).Value2 = m.Range("D5:D10").Value2
    data.Range(data.Cells(119, col), data.Cells(124, col)).Value2 = m.Range("E5:E10").Value2
    For i = 0 To 9
        data.Cells(134 + i, col).Value2 = m.Cells(21 + i, 2).Value2 / m.Range("B19").Value2 * 98
    Next i
    data.Cells(145, col).Value2 = (m.Range("B25").Value2 - m.Range("B33").Value2) / m.Range("B29").Value2
    data.Cells(146, col).Value2 = (m.Range("B25").Value2 - m.Range("B34").Value2) / m.Range("B29").Value2
    data.Cells(147, col).Value2 = "Australia/Sydney"
    data.Cells(128, col).Value2 = CurrentKey(sheetName)
End Sub

Public Function ScenarioCount() As Long
    ScenarioCount = WorksheetFunction.CountA(ThisWorkbook.Worksheets("Scenario Data").Range("B4:F4"))
End Function

Private Function NextSlot(ByVal allowReplacement As Boolean) As Long
    Dim data As Worksheet, col As Long, oldestID As Double
    Set data = ThisWorkbook.Worksheets("Scenario Data")
    For col = 2 To MaxScenarios + 1
        If Len(data.Cells(4, col).Value2) = 0 Then NextSlot = col: Exit Function
    Next col
    If Not allowReplacement Then Exit Function
    oldestID = 1E+30
    For col = 2 To MaxScenarios + 1
        If data.Cells(1, col).Value2 < oldestID Then
            oldestID = data.Cells(1, col).Value2: NextSlot = col
        End If
    Next col
End Function

Private Sub SaveWithPrompt(ByVal sheetName As String)
    Dim name As String, allowReplacement As Boolean, slot As Long, oldName As String
    If Not CanSaveScenario(sheetName) Then
        MsgBox "Calculate a successful plan with the current inputs before saving a scenario.", vbExclamation, "Scenario not saved"
        Exit Sub
    End If
    If ThisWorkbook.ReadOnly Then
        MsgBox "Save a writable copy of this workbook before recording scenarios.", vbExclamation, "Read-only workbook"
        Exit Sub
    End If
    name = Trim(InputBox("Name this scenario (up to 60 characters):", "Save scenario", sheetName & " - " & Format(Now, "dd mmm hh:mm")))
    If Len(name) = 0 Then Exit Sub
    If ScenarioCount() >= MaxScenarios Then
        slot = NextSlot(True)
        oldName = ThisWorkbook.Worksheets("Scenario Data").Cells(4, slot).Value2
        If MsgBox("The history contains " & MaxScenarios & " scenarios." & vbCrLf & vbCrLf & "Replace the oldest record: " & oldName & "?" & vbCrLf & "Save a separate workbook copy first if you need to keep it.", vbYesNo + vbExclamation + vbDefaultButton2, "History full") <> vbYes Then Exit Sub
        allowReplacement = True
    End If
    StoreScenario sheetName, name, allowReplacement, True
End Sub

Public Function StoreScenario(ByVal sheetName As String, ByVal scenarioName As String, Optional ByVal allowReplacement As Boolean = False, Optional ByVal showMessages As Boolean = False) As Boolean
    Dim data As Worksheet, compare As Worksheet, slot As Long, col As Long, id As Long
    Dim oldName As String, label As String, cell As Range, copied As Boolean
    On Error GoTo Failed
    If Not CanSaveScenario(sheetName) Or ThisWorkbook.ReadOnly Then Exit Function
    scenarioName = Trim(scenarioName)
    If Len(scenarioName) = 0 Or Len(scenarioName) > 60 Then
        If showMessages Then MsgBox "Use a scenario name between 1 and 60 characters.", vbExclamation
        Exit Function
    End If
    slot = NextSlot(allowReplacement)
    If slot = 0 Then Exit Function
    Set data = ThisWorkbook.Worksheets("Scenario Data")
    Set compare = ThisWorkbook.Worksheets("Scenario Comparison")
    Application.EnableEvents = False
    oldName = CStr(data.Cells(4, slot).Value2)
    id = CLng(data.Range("Q1").Value2)
    col = StageColumn(sheetName)
    data.Range(data.Cells(1, slot), data.Cells(SnapshotRows, slot)).Value2 = data.Range(data.Cells(1, col), data.Cells(SnapshotRows, col)).Value2
    label = Format(id, "000") & " | " & scenarioName & " | " & Format(data.Cells(2, slot).Value2, "dd mmm hh:mm") & " | " & IIf(sheetName = "Cost Optimisation", "Cost", "Supply")
    data.Cells(1, slot).Value2 = id
    data.Cells(4, slot).Value2 = label
    data.Cells(22, slot).Value2 = "'" & scenarioName
    data.Range("Q1").Value2 = id + 1
    For Each cell In compare.Range("C6:D6").Cells
        If Len(oldName) > 0 And CStr(cell.Value2) = oldName Then cell.ClearContents
    Next cell
    compare.Range("B6").Formula = "=IF(COUNTA('Scenario Data'!B4:F4)=0,"""",INDEX('Scenario Data'!B4:F4,1,MATCH(MAX('Scenario Data'!B1:F1),'Scenario Data'!B1:F1,0)))"
    Application.Calculate
    copied = True
    ThisWorkbook.Save
    StoreScenario = True
    If showMessages Then MsgBox "Scenario saved: " & label & vbCrLf & "Select records on Scenario Comparison to compare them.", vbInformation, "Scenario saved"
CleanUp:
    Application.EnableEvents = True
    Exit Function
Failed:
    If showMessages Then
        If copied Then
            MsgBox "The snapshot was recorded, but the file could not be saved. Save the workbook manually before closing." & vbCrLf & Err.Description, vbExclamation
        Else
            MsgBox "Scenario could not be recorded: " & Err.Description, vbExclamation
        End If
    End If
    GoTo CleanUp
End Function
