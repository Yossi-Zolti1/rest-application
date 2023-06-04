export interface Restaurant {
    id: number
    name: string,
    street: string,
    city: string,
    phone: string,
    kashrut: string | null,
    type: string,
    logo: string,
    my?: FormData
}
