import React from "react";

// storageUtils.js

// Função genérica para salvar dados no sessionStorage
export const saveToStorage = (key, data) => {
    try {
        const jsonData = JSON.stringify(data);
        sessionStorage.setItem(key, jsonData);
    } catch (error) {
        console.error(`Erro ao salvar no sessionStorage [${key}]:`, error);
    }
};

// Função genérica para carregar dados do sessionStorage
export const loadFromStorage = (key, defaultValue = null) => {
    try {
        const jsonData = sessionStorage.getItem(key);
        return jsonData ? JSON.parse(jsonData) : defaultValue;
    } catch (error) {
        console.error(`Erro ao carregar do sessionStorage [${key}]:`, error);
        return defaultValue;
    }
};

// Função para remover dados do sessionStorage
export const removeFromStorage = (key) => {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error(`Erro ao remover do sessionStorage [${key}]:`, error);
    }
};