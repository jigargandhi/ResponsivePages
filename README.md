ResponsivePages
===============
Every browser has a single thread of execution that does one of the following at a particular time:
1. Run a piece of JavaScript code.
2. Paint or repaint DOM.
3. Handle events.
 
Due to this single thread model, browsers often tend to be unresponsive when we do heavy computations like binding grids to DOM, array processing, etc.. To an extreme if the limit of computation is exceeds, browsers start to give infamous "long running script" pop-up.
 
This situation raises the following problem:
How to do heavy computation while keeping the browser responsive?
 
To solve this problem let us dig a little more into how the browser works:
 
As mentioned earlier browser, only does 1 of the three tasks mentioned above. Every task that the browser has to do is queued into the browser's event queue (read TO DO list). The task of the browser is to process the events in its event queue on an item basis. During the execution of the foremost item of the queue, if any event (external or internal) occurs, like a timer event, resize events, network events, click events, the event processing is then queued for later execution.
 
When an AJAX requests succeeds, if the browser is busy running JavaScript or updating UI, it will not immediately process the event. Instead the browser will complete the current pending tasks and executes the handler when it comes to the front of the queue. When you run a long running script the browser is busy executing the current task before moving on to the next task and hence it starves the other pending tasks in the event queue.
 
cid:image001.png@01CEC01E.8AC03FD0
 
 
The solution is to stop the JavaScript in a long running operations temporarily so that browser may do other tasks and resuming the execution of our operations. This technique is called as script yielding and is explained subsequently.
 
Without Script Yielding
 
Let us see how the browser tries to execute the simple version of bubble sort without script yielding.
 
In the attached solution there are two pages, requirement of both the pages is to sort an array of 1000 elements and also allow the users to change the background color of the page. The non functional requirement is that sorting should not impact the browser responsiveness. Open the solution run it using F5 and browse to unresponsive page. Click on the button with label start sorting and then click on change background color. 
cid:image002.png@01CEC01E.8AC03FD0
 
You will see the "Start sorting" button is stuck and nothing happens on click of "Change background color". However after some time when sorting completes, you will see a log message below the buttons and describing sorting start and end time. And at this point the background color of the page will also change. See the diagram below for how the JavaScript started execution of the events. 
 
cid:image003.png@01CEC01E.8AC03FD0
 
Go back to the solution and browse Scripts\UnresponsiveSort.js; you will see that it is plain vanilla bubble sorting. 
 
cid:image004.png@01CEC01E.8AC03FD0
 
With Script Yielding
 
IE 10 introduced a new function setImmediate(handler, arguments). This function queues the handler to the event queue. However, when the current script block completes it checks if additional event handlers are pending in the queue, completes them and then calls handler(arguments).  
 
To see an example, run the solution again and navigate to Responsive Page. When you click on the Start sorting button on this page you will notice that the page does not get unresponsive and you are able to change the background color. The code to do sorting on this page is slightly modified as shown below (Scripts/ResponsiveSort.js) 
cid:image005.png@01CEC01E.8AC03FD0 
 
We all know that bubble sort consists of 2 loops i.e. outer loop and inner loop. We have broken down the task of sorting in len number of tasks; the duty of each task will be to scan the array once and swap elements. When the function executes the outer loop with will call setImmediate len times. These calls will queue len instances of inner loops into the event queue. 
 
When you start the sorting and click on the event handler for changing the background, all setImmediate calls are queued into the event queue and even your click handler is queued (see snapshot of the explanation below). 
 
cid:image006.png@01CEC01E.8AC03FD0
 
Now when the current executing block of outer loop competes, the setImmediate function scans the complete event queue for pending handlers, if it finds any handler it brings the
handler to the front of the queue. 
cid:image007.png@01CEC01E.8AC03FD0
After, the click handler is processed the background color changes and the control goes to the inner loop 0 again. This time since there is no other event handler pending in the queue, it executes.
 
cid:image008.png@01CEC01E.8AC03FD0
Thus by using setImmediate, we can deprioritize our execution to more important handlers and keep our page responsive at all the times.
 
References:
1. JavaScript Execution and Browser Limits
2. setImmediate method
