import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { apiConfig } from "./api.config";

export class ApiBase<T, Tid = string | number> {

    private readonly _axiosInstance: AxiosInstance;
    private _url: string;
    constructor(url: string){
        this._url = url;
        
        this._axiosInstance = axios.create(apiConfig);
        
        this._axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                if(error.message === 'Network Error')
                    return Promise.reject(new Error('Erro de conexão.'));

                return Promise.reject(error);
            }
        );
    }

    public async Obter(id: Tid): Promise<T | Error>{
        const erroAoObter = 'Erro ao obter dados.'
        try{
            const { data } = await this._axiosInstance.get<T>(`${this._url}${id}`);
    
            if(data)
                return data;
    
            return new Error(erroAoObter);
        }
        catch(error){
            console.error(error);
            return new Error((error as {message: string}).message || erroAoObter);
        }
    }

    public async Listar(page = 1, filter = ''): Promise<T | Error>{
        const limiteLinhas = 10;
        const erroAoListar = 'Erro ao listar.';

        try{
            const url = `${this._url}?_page=${page}&_limit=${limiteLinhas}&descricao_like=${filter}`;

            const { data, headers } = await this._axiosInstance.get(url);

            if(data){
                return {
                    ...data,
                    totalCount: Number(headers['x-total-count'] || limiteLinhas)
                };
            }

            return new Error(erroAoListar);
        }
        catch(error){
            console.error(error);
            return new Error((error as {message: string}).message || erroAoListar);
        }
    }

    public async Inserir(dados: T): Promise<T | Error>{
        const erroAoCriar = 'Erro ao inserir os dados.';

        try{
            const { data } = await this._axiosInstance.post<T>(this._url, dados);

            if(data)
                return data;

            return new Error(erroAoCriar);
        }
        catch(error){
            console.error(error);
            return new Error((error as {message: string}).message || erroAoCriar);
        }
    }

    public async Atualizar(id: Tid, dados: T): Promise<void | Error>{
        try{
            await this._axiosInstance.put<T>(`${this._url}${id}`, dados);
        }
        catch(error){
            console.error(error);
            return new Error((error as {message: string}).message || 'Erro ao Atualizar os dados.');
        }
    }
    
    public async Excluir(id: Tid): Promise<void | Error> {
        try{
            await this._axiosInstance.delete<T>(`${this._url}${id}`);
        }
        catch(error){
            console.error(error);
            return new Error((error as {message: string}).message || 'Erro ao excluir o dado.');
        }
    }
}