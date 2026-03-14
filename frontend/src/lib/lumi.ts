import { createClient } from '@lumi.new/sdk'

export const lumi = createClient({
  projectId: 'p422754124020203520',
  apiBaseUrl: 'https://api.lumi.new',
  authOrigin: 'https://auth.lumi.new',
})

// API LOCAL
const API_BASE_URL = "https://localhost:7181/api";

export async function getUsuarios() {
  const response = await fetch(`${API_BASE_URL}/UsuarioApi`);
  return response.json();
}

export async function criarUsuario(usuario: { nome: string; senha: string; tipo: string }) {
  const response = await fetch(`${API_BASE_URL}/UsuarioApi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  return response.json();
}

export async function atualizarUsuario(id: number, usuario: { nome: string; senha: string; tipo: string }) {
  const response = await fetch(`${API_BASE_URL}/UsuarioApi/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  return response.json();
}

export async function excluirUsuario(id: number) {
  const response = await fetch(`${API_BASE_URL}/UsuarioApi/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}