Option Explicit

Public Sub Calculate()
    RunOptimisation False
End Sub

Public Sub CostOptimisation()
    RunOptimisation True
End Sub

Public Sub InvalidateResults(Optional ByVal sheetName As String = "")
    Dim ws As Worksheet
    Application.EnableEvents = False
    For Each ws In ThisWorkbook.Worksheets
        If (ws.Name = "Cost Optimisation" Or ws.Name = "Supply Plan") And (sheetName = "" Or ws.Name = sheetName) Then
            ws.Range("C15:C26,C31:D35").ClearContents
            ws.Range("A10").Value = "Inputs changed - click the button to calculate"
            ws.Range("A10:G10").Interior.Color = RGB(255, 242, 204)
        End If
    Next ws
    Application.EnableEvents = True
End Sub

Private Sub RunOptimisation(ByVal costMode As Boolean)
    Dim m As Worksheet, src As Worksheet, dest As Worksheet
    Dim volume As Double, availableD As Double, availableW As Double
    Dim i As Long, row As Long, result As Variant, ok As Boolean, tol As Double, stockColumn As Long
    Dim solverPath As String, ai As AddIn, vals As Variant, targets As Variant, stage As String
    Dim solverBook As Workbook
    On Error GoTo Failed
    Set m = ThisWorkbook.Worksheets("Model")
    If costMode Then
        Set src = ThisWorkbook.Worksheets("Cost Optimisation")
        stockColumn = 3
    Else
        Set src = ThisWorkbook.Worksheets("Supply Plan")
        stockColumn = 2
    End If
    Set dest = src
    Application.EnableEvents = False
    dest.Range("C15:C26,C31:D35").ClearContents
    For row = 6 To 8
        If IsError(src.Cells(row, 2).Value) Then GoTo BadInput
        If Len(src.Cells(row, 2).Value) = 0 Or Not IsNumeric(src.Cells(row, 2).Value) Then GoTo BadInput
    Next row
    volume = CDbl(src.Range("B6").Value)
    availableD = CDbl(src.Range("B7").Value)
    availableW = CDbl(src.Range("B8").Value)
    If volume <= 0 Or availableD < 0 Or availableW < 0 Then GoTo BadInput
    If costMode Then
        For i = 15 To 26
            If IsError(dest.Cells(i, 5).Value) Then GoTo BadPrice
            If Len(dest.Cells(i, 5).Value) = 0 Or Not IsNumeric(dest.Cells(i, 5).Value) Then GoTo BadPrice
            If CDbl(dest.Cells(i, 5).Value) < 0 Then GoTo BadPrice
            m.Cells(i - 10, 6).Value = CDbl(dest.Cells(i, 5).Value)
        Next i
        m.Range("B2").Formula = "=SUMPRODUCT(B5:B16,F5:F16)"
    Else
        m.Range("B2").Formula = "=SUMPRODUCT(O5:O10,P5:P10)"
    End If
    m.Range("B5:B16").Value = m.Range("C5:C16").Value
    m.Range("O5:O10").Value = 0
    For i = 6 To 10
        m.Cells(i, 5).Value = ThisWorkbook.Worksheets("Formulation Rules").Cells(i + 17, 4).Value
    Next i
    ' D90 can exceed original usage, but never the stock available for this output.
    m.Range("E5").Value = availableD / volume
    m.Range("E6").Value = WorksheetFunction.Min(150#, availableW / volume)
    For i = 7 To 16
        With ThisWorkbook.Worksheets("Other Stock").Cells(i, stockColumn)
            If IsError(.Value) Then GoTo BadStock
            If Len(.Value) > 0 Then
                If Not IsNumeric(.Value) Then GoTo BadStock
                If CDbl(.Value) < 0 Then GoTo BadStock
                If i <= 10 Then
                    m.Cells(i, 5).Value = WorksheetFunction.Min(m.Cells(i, 5).Value, CDbl(.Value) / volume)
                ElseIf CDbl(.Value) + 0.00001 < m.Cells(i, 2).Value * volume Then
                    dest.Range("A10").Value = "Insufficient stock: " & m.Cells(i, 1).Value
                    GoTo CleanUp
                End If
            End If
        End With
    Next i
    solverPath = Application.LibraryPath & "\SOLVER\SOLVER.XLAM"
    If Dir(solverPath) = "" Then
        dest.Range("A10").Value = "Excel Solver is unavailable on this computer."
        GoTo CleanUp
    End If
    stage = "load Solver"
    Set ai = Application.AddIns.Add(solverPath, False)
    ai.Installed = True
    On Error Resume Next
    Set solverBook = Application.Workbooks("SOLVER.XLAM")
    On Error GoTo Failed
    If solverBook Is Nothing Then Set solverBook = Application.Workbooks.Open(solverPath)
    m.Visible = xlSheetVisible
    m.Activate
    stage = "reset Solver"
    Application.Run "Solver.xlam!SolverReset"
    stage = "set objective"
    If costMode Then
        Application.Run "Solver.xlam!SolverOk", m.Range("B2"), 2, 0, m.Range("B5:B10"), 2
    Else
        Application.Run "Solver.xlam!SolverOk", m.Range("B2"), 2, 0, m.Range("B5:B10,O5:O10"), 2
        Application.Run "Solver.xlam!SolverAdd", m.Range("O5:O10"), 3, 0
        Application.Run "Solver.xlam!SolverAdd", m.Range("Q5:Q10"), 1, m.Range("C5:C10")
        Application.Run "Solver.xlam!SolverAdd", m.Range("R5:R10"), 1, m.Range("S5:S10")
    End If
    stage = "set constraints"
    Application.Run "Solver.xlam!SolverAdd", m.Range("B5:B10"), 3, m.Range("D5:D10")
    Application.Run "Solver.xlam!SolverAdd", m.Range("B5:B10"), 1, m.Range("E5:E10")
    Application.Run "Solver.xlam!SolverAdd", m.Range("B20"), 2, m.Range("C20")
    Application.Run "Solver.xlam!SolverAdd", m.Range("B21:B30"), 3, m.Range("C21:C30")
    Application.Run "Solver.xlam!SolverAdd", m.Range("B21:B30"), 1, m.Range("D21:D30")
    Application.Run "Solver.xlam!SolverAdd", m.Range("B31"), 3, 0
    Application.Run "Solver.xlam!SolverAdd", m.Range("B32"), 1, 0
    Application.Run "Solver.xlam!SolverAdd", m.Range("B33"), 3, 0
    Application.Run "Solver.xlam!SolverAdd", m.Range("B34"), 1, 0
    Application.Calculate
    stage = "solve"
    result = Application.Run("Solver.xlam!SolverSolve", True)
    stage = "finish " & TypeName(result)
    Application.Run "Solver.xlam!SolverFinish", 1
    Application.Calculate
    tol = 0.00001
    ok = (CLng(result) = 0 Or CLng(result) = 1 Or CLng(result) = 2)
    If Abs(m.Range("B20").Value - m.Range("C20").Value) > tol Then ok = False
    For i = 5 To 10
        If m.Cells(i, 2).Value < m.Cells(i, 4).Value - tol Or m.Cells(i, 2).Value > m.Cells(i, 5).Value + tol Then ok = False
    Next i
    For i = 21 To 30
        If m.Cells(i, 2).Value < m.Cells(i, 3).Value - tol Or m.Cells(i, 2).Value > m.Cells(i, 4).Value + tol Then ok = False
    Next i
    If m.Range("B31").Value < -tol Or m.Range("B32").Value > tol Or m.Range("B33").Value < -tol Or m.Range("B34").Value > tol Then ok = False
    If m.Range("B42").Value < ThisWorkbook.Worksheets("Formulation Rules").Range("B19").Value - 0.0000000001 Then ok = False
    If Not ok Then
        dest.Range("A10").Value = "No feasible plan with this stock and these formulation limits."
        dest.Range("A10:G10").Interior.Color = RGB(252, 228, 214)
        GoTo CleanUp
    End If
    For i = 5 To 16
        dest.Cells(i + 10, 3).Value = m.Cells(i, 2).Value * volume
    Next i
    vals = m.Range("B40:B44").Value
    For i = 1 To 5
        dest.Cells(i + 30, 3).Value = vals(i, 1)
        dest.Cells(i + 30, 4).Value = "Within range"
    Next i
    dest.Range("A10").Value = IIf(costMode, "Lowest-cost feasible formulation", "Stock plan calculated") & " | " & Format(Now, "dd mmm hh:mm")
    dest.Range("A10:G10").Interior.Color = RGB(226, 240, 217)
    Application.Calculate
    RememberCalculation dest.Name
    GoTo CleanUp
BadInput:
    dest.Range("A10").Value = "Enter production MT above zero and non-negative D90/WPC80 stock."
    GoTo CleanUp
BadPrice:
    dest.Range("A10").Value = "Enter a non-negative $/kg price for every ingredient. Zero is allowed."
    GoTo CleanUp
BadStock:
    dest.Range("A10").Value = "Other Stock: enter non-negative quantities or leave blank."
    GoTo CleanUp
Failed:
    If Not dest Is Nothing Then
        dest.Range("C15:C26,C31:D35").ClearContents
        dest.Range("A10").Value = "Calculation could not complete (" & stage & "): " & Err.Description
    End If
CleanUp:
    On Error Resume Next
    dest.Activate
    m.Visible = xlSheetVeryHidden
    Application.EnableEvents = True
End Sub
