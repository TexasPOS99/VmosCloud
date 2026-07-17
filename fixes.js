// v2.2: selection scope and replace-queue controls
$('#selectVisibleBtn').onclick=()=>{state.selected.clear();filtered().forEach(d=>state.selected.add(key(d)));renderDevices();renderBulk()};
['accountFilter','groupFilter','statusFilter'].forEach(id=>{$('#'+id).addEventListener('change',()=>{clearSelection();renderDevices()})});
$('#cancelQueue').onclick=()=>{if(state.queueRunning){state.cancelQueue=true;$('#apiState').textContent='กำลังหยุดคิว...'}};
