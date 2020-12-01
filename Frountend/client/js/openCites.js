function returnTabs() {
    let tabs = []
    //this grabs all tabs in the window grabed from mozila themselfs
    for (windowInfo of windowInfoArray) {
        console.log(`Window: ${windowInfo.id}`);
        //console.log(windowInfo.tabs.map(tab => tab.url));
        tabs = windowInfo.tabs.map(tab => tab.url)
    }
    console.log(tabs)
    return tabs;
}
var gettingAll = windows.getAll({populate: true})
gettingAll.then(returnTabs);