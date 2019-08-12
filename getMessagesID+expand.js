//javascript:
let elemNav = document.getElementsByClassName("nav navbar-nav")[0];

let elemMenu = document.createElement("li");

	elemMenu.setAttribute("role", "presentation");
	elemMenu.setAttribute("style", "cursor: pointer");
	elemMenu.innerHTML = '<a onclick="getMessagesID()">Get ID</a>';
	elemNav.insertBefore(elemMenu, elemNav.lastElementChild);

function getMessagesID() {
	if ( confirm("Expand all messages on the page?") ) {
		Array.prototype.forEach.call(document.getElementsByClassName('message-row'), i => i.click());
	}
	
	let IDElem = document.getElementsByClassName("message-details-title");
	
	if (IDElem.length != 0) {
		let result = document.createElement("div");
		
		result.innerHTML = `
		<div class="modal-backdrop fade in"></div>
		<div role="dialog" tabindex="-1" class="fade in modal" style="display: block;">
			<div class="modal-dialog" style="width: 700px;">
				<div class="modal-content" role="document">
					 <div class="modal-header">
						<button type="button" class="close" onclick="document.body.lastElementChild.remove()">
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title"><span>Get messages' ID for deleting</span></h4>
					 </div>
					 <div class="modal-body">
						<div class="configuration">
							<div>
								<textarea id="customMessageID" style="min-width:100%; max-width:100%; min-height:300px;"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" onclick="document.body.lastElementChild.remove()">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>`;
				
		result.setAttribute("role", "dialog");
		
        let valueString = "";
		
        for (item of IDElem) {
            let [ , itemProto , itemDomain, itemType, itemIndex, itemID ] = item.lastChild.href.match(/(.*?):\/\/(.*?)\/(.*?)s\/(.*?)\/(.*?)$/i);
            valueString += `curl -XDELETE '${itemProto}://${itemDomain}:9200/${itemIndex}/${itemType}/${itemID}'\n`
        }
		
        document.body.appendChild(result);
		document.getElementById("customMessageID").value = valueString;
		
    } else 
		alert("Nothing selected!")
}