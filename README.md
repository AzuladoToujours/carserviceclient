# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.
Forked and updated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `npm i --save` to get all the dependencies needed to run the project.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Car's service changes

For deleting any Owner instance at the car service, you may see two new methods in the car's service: **removeOwners():** This method will receive an Array of owners' dnis to delete, search in each of the cars and compare the car's ownerDni to the owner in the array; if there's a match, we will create a newCar variable with the same info of the car, and do the ***saveWithoutOwner()***.

**SaveWithoutOwner():** This method will receive a car object without the owner's dni, then do a put request.


## Owner's service development

As we have to consume the API (https://thawing-chamber-47973.herokuapp.com/owners) in HAL format, the ***getAll()*** have had some changes compared to the one suggested at [car.service.ts]. Returning only the _embedded.owners Array.

To get one single user via the ***get()***; i took the decision to use the findByDni URI that the API provided; also returning a JSON response with HAL format, returning only the .embedded object.

Saving, updating and removing an owner is no different to the one suggested at[car.service.ts].

As one of the objectives described in the proposal of the project was to remove multiple owners simultaneously, the ***removeList()*** helps us to get the work done.

- At first, the method receives an Array of owners' DNI. 
- With each of the DNI in the array, we'll get the user via the ***get()*** to get all the info including the href needed to delete the owner. 
- Deconstruct the owner's href to use the ***remove()***.
-Finally, return the new list of Owners.

## Cars's Component changes

The only important change was made in the Html of Edit and list component, in the edit component was necessary no add the owner, so it was done with the mat-select.
As in the list component, we are now able to see if a car has an owner; if we click the owner DNI we'll get redirected to the Edit of that same owner.

## Owner's Component Development

The edit component is pretty simple, we'll only be sure that there's a dni in the params, if there is, we'll get the owner's info and render it in the html, if there's no owner, we'll simply make a console log and then list yet again the available owners.

The list component is made with five important methods.

- **getOwners():** Will return the list of owners from the API.

- **getSelectedOwners():** This will get the checked owners and store them in an array.

- **removeListOfOwners():** Firstly, It will check if there are selected owners to delete. Then it will activate the following methods ***updateCars()***, ***removeOwners()*** and ***removeOwnersFromArray()***, by the other hand if there's no owners selected, the component will simply display a message 'There are no owners to delete'.

- **updateCars():** This will do a fetch to the carService's method ***removeOwners()***, already explained.

- **removeOwners():** This will do a fetch to the ownerService's method ***removeList()***, already explained.

- **removeOwnersFromArray():** As i encountered some difficulties with refetching the data without a refresh, and not displaying the deleted owners after the delete button was clicked; the ***removeOwnersFromArray()*** will help to mutate the owners array in the component by deleting the selected owners with the ***splice*** method...




