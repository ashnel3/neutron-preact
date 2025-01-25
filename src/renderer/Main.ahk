#Requires AutoHotkey v2.0
#Include ..\..\node_modules\neutron\Neutron.ahk

ExampleBinding(neutron) {
  MsgBox("Hello from AutoHotkey " A_AhkVersion)
}

neutron := NeutronWindow()

if EnvGet('DEV_SERVER') == 'true' and EnvGet('DEV_SERVER_PORT') {
  url := "http://localhost:" EnvGet('DEV_SERVER_PORT') "/main"
  ; Navigate to the calculated file URL
  neutron.wb.Navigate(url)

  ; Wait for the page to finish loading
  while neutron.wb.readyState < 3
    Sleep 50

  ; Inject the AHK objects into the JS scope
  neutron.wnd.neutron := neutron
  neutron.wnd.ahk := NeutronWindow._Dispatch(neutron)

  ; Wait for the page to finish loading
  while neutron.wb.readyState < 4
    Sleep 50
} else {
  neutron.Load("..\main\index.html")
}

neutron
  .OnEvent("Close", (*) => ExitApp())
  .Show(, "Neutron.ahk")
