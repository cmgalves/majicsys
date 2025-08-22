SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[sp_incluiAlteraCliente]

--sp_incluiAlteraCliente 001, 'descricação do negocio'
	@tipoCarac int,
	@codCarac varchar(03),
	@descCarac varchar(55)
as


if @tipoCarac = 1
	begin
		insert into PCP..qualCarac  
			(codCarac, descCarac)
		values
			(@codCarac, @descCarac)
	end

if @tipoCarac = 2
	begin
		update 
			PCP..qualCarac 
		set
			descCarac = @descCarac
		where
			codCarac = @codCarac
	end

GO
