import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/userCases/createCar/CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });
    });

    it("should not be able to create a car with exists license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "Category"
            });
        }).rejects.toBeInstanceOf(AppError)
    })
})